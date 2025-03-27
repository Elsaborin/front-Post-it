"use client"

import { useState, useMemo, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { useLocalSearchParams } from "expo-router"
import Header from "../../../components/Header"
import SaveButton from "../../../components/save-button"
import { ChevronLeft, Users, UserX, Clock, Calendar, Search, ChevronRight } from "lucide-react-native"
import AttendanceEditModal from "../../../components/attendance-edit-modal"

const ATTENDANCE_STATUS = {
  PRESENT: "present",
  ABSENT: "absent",
  LATE: "late",
}

export default function AsistenciasScreen() {
  const { id } = useLocalSearchParams()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [filter, setFilter] = useState("")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [savedAttendances, setSavedAttendances] = useState({})
  const [unsavedChanges, setUnsavedChanges] = useState({})

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Hernández Primo Julián",
      attendance: {},
    },
    {
      id: 2,
      name: "García López María",
      attendance: {},
    },
    {
      id: 3,
      name: "Rodríguez Sánchez Carlos",
      attendance: {},
    },
    {
      id: 4,
      name: "Martínez Flores Ana",
      attendance: {},
    },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  }

  const currentDateStr = formatDate(currentDate)

  const updateAttendance = (studentId, date, newStatus, callback) => {
    setIsSaving(true)
    setTimeout(() => {
      setSavedAttendances((prev) => ({
        ...prev,
        [date]: {
          ...prev[date],
          [studentId]: newStatus,
        },
      }))

      setStudents((prevStudents) =>
        prevStudents.map((student) => {
          if (student.id === studentId) {
            return {
              ...student,
              attendance: {
                ...student.attendance,
                [date]: newStatus,
              },
            }
          }
          return student
        }),
      )

      setUnsavedChanges((prev) => ({
        ...prev,
        [date]: {
          ...prev[date],
          [studentId]: newStatus,
        },
      }))

      setIsSaving(false)
      if (callback) callback()
    }, 500)
  }

  const saveChanges = () => {
    setIsSaving(true)
    const dataToSave = { ...savedAttendances }
    
    students.forEach((student) => {
      if (!dataToSave[currentDateStr]) {
        dataToSave[currentDateStr] = {}
      }
      dataToSave[currentDateStr][student.id] =
        unsavedChanges[currentDateStr]?.[student.id] || student.attendance[currentDateStr] || ATTENDANCE_STATUS.PRESENT
    })

    setTimeout(() => {
      setIsSaving(false)
      setSavedAttendances(dataToSave)
      setStudents((prevStudents) =>
        prevStudents.map((student) => ({
          ...student,
          attendance: {
            ...student.attendance,
            [currentDateStr]: dataToSave[currentDateStr][student.id],
          },
        })),
      )
      setUnsavedChanges({})
    }, 1000)
  }

  const calculateAttendancePercentage = (attendance) => {
    const total = Object.keys(attendance).length
    const presentDays = Object.values(attendance).filter(
      (a) => a === ATTENDANCE_STATUS.PRESENT || a === ATTENDANCE_STATUS.LATE,
    ).length
    return total > 0 ? Math.round((presentDays / total) * 100) : 100
  }

  const getStatusColor = (status) => {
    switch (status) {
      case ATTENDANCE_STATUS.PRESENT:
        return "#4ade80"
      case ATTENDANCE_STATUS.ABSENT:
        return "#f87171"
      case ATTENDANCE_STATUS.LATE:
        return "#fbbf24"
      default:
        return "#4ade80"
    }
  }

  const filteredStudents = useMemo(() => {
    return students.filter((student) => student.name.toLowerCase().includes(filter.toLowerCase()))
  }, [students, filter])

  const attendanceSummary = useMemo(() => {
    const present = students.filter(
      (s) => s.attendance[currentDateStr] === ATTENDANCE_STATUS.PRESENT || !s.attendance[currentDateStr],
    ).length
    const absent = students.filter((s) => s.attendance[currentDateStr] === ATTENDANCE_STATUS.ABSENT).length
    const late = students.filter((s) => s.attendance[currentDateStr] === ATTENDANCE_STATUS.LATE).length
    return { present, absent, late, total: students.length }
  }, [students, currentDateStr])

  const renderCalendar = () => {
    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

    const previousMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const nextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const selectDate = (day) => {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      setCurrentDate(newDate)
      setIsCalendarOpen(false)
    }

    const isToday = (day) => {
      const today = new Date()
      return (
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear()
      )
    }

    const isSelectedDay = (day) => day === currentDate.getDate()

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={previousMonth}>
            <ChevronLeft size={24} color="#696999" />
          </TouchableOpacity>
          <Text style={styles.calendarTitle}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
          <TouchableOpacity onPress={nextMonth}>
            <ChevronRight size={24} color="#696999" />
          </TouchableOpacity>
        </View>

        <View style={styles.calendarDays}>
          {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"].map((day) => (
            <Text key={day} style={styles.calendarDayName}>{day}</Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <View key={`empty-${index}`} style={styles.calendarDay} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1
            return (
              <TouchableOpacity
                key={day}
                style={[styles.calendarDay, isSelectedDay(day) && styles.selectedDay, isToday(day) && styles.todayDay]}
                onPress={() => selectDate(day)}
              >
                <Text style={[styles.calendarDayText, isSelectedDay(day) && styles.selectedDayText]}>{day}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header title="Asistencias">
        <View style={styles.headerContent}>
          <ChevronLeft size={24} color="#696999" />
          <Text style={styles.headerTitle}>Asignatura I Grupo</Text>
        </View>
      </Header>

      <SaveButton onPress={saveChanges} isSaving={isSaving} />

      <ScrollView style={styles.mainScrollView}>
        <View style={styles.searchContainer}>
          <TouchableOpacity 
            style={styles.dateSelector} 
            onPress={() => setIsCalendarOpen(!isCalendarOpen)}
          >
            <Calendar size={20} color="#696999" />
            <Text style={styles.dateText}>
              {currentDate.toLocaleDateString("es-ES", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })}
            </Text>
          </TouchableOpacity>

          <View style={styles.searchBox}>
            <Search size={20} color="#696999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar estudiante..."
              placeholderTextColor="#696999"
              value={filter}
              onChangeText={setFilter}
            />
          </View>
        </View>

        {isCalendarOpen && <View style={styles.calendarPopup}>{renderCalendar()}</View>}

        <View style={styles.statsContainer}>
          <View style={[styles.statBox, styles.presentBox]}>
            <Users size={24} color="white" />
            <Text style={styles.statNumber}>{attendanceSummary.present}</Text>
            <Text style={styles.statLabel}>Presentes</Text>
          </View>
          <View style={[styles.statBox, styles.absentBox]}>
            <UserX size={24} color="white" />
            <Text style={styles.statNumber}>{attendanceSummary.absent}</Text>
            <Text style={styles.statLabel}>Ausentes</Text>
          </View>
          <View style={[styles.statBox, styles.lateBox]}>
            <Clock size={24} color="white" />
            <Text style={styles.statNumber}>{attendanceSummary.late}</Text>
            <Text style={styles.statLabel}>Retardos</Text>
          </View>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipText}>
            Mantén presionado un alumno para ver y editar su historial de asistencias
          </Text>
        </View>

        <View style={styles.studentListContainer}>
          {filteredStudents.map((student) => {
            const attendanceStatus =
              unsavedChanges[currentDateStr]?.[student.id] ||
              student.attendance[currentDateStr] ||
              ATTENDANCE_STATUS.PRESENT
            const statusColor = getStatusColor(attendanceStatus)
            const attendancePercentage = calculateAttendancePercentage(student.attendance)

            return (
              <TouchableOpacity
                key={student.id}
                style={[styles.attendanceRow, { backgroundColor: statusColor }]}
                onPress={() => {
                  const nextStatus =
                    attendanceStatus === ATTENDANCE_STATUS.PRESENT
                      ? ATTENDANCE_STATUS.ABSENT
                      : attendanceStatus === ATTENDANCE_STATUS.ABSENT
                        ? ATTENDANCE_STATUS.LATE
                        : ATTENDANCE_STATUS.PRESENT

                  setUnsavedChanges((prev) => ({
                    ...prev,
                    [currentDateStr]: {
                      ...prev[currentDateStr],
                      [student.id]: nextStatus,
                    },
                  }))
                }}
                onLongPress={() => {
                  setSelectedStudent(student)
                  setIsDialogOpen(true)
                }}
              >
                <Text style={styles.studentName}>{student.name}</Text>
                <View style={styles.attendanceContainer}>
                  <Text style={styles.attendanceLabel}>Asistencia:</Text>
                  <Text style={styles.attendanceValue}>{`${attendancePercentage}%`}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>

      <AttendanceEditModal
        visible={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        student={selectedStudent}
        onUpdateAttendance={updateAttendance}
        initialDate={currentDate}
        savedAttendances={savedAttendances}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 18,
    color: "#696999",
    fontFamily: "Righteous-Regular",
    maxWidth: "80%",
  },
  searchContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    backgroundColor: "white",
    gap: 10,
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 10,
    flex: 1,
    minWidth: "48%",
  },
  dateText: {
    marginLeft: 8,
    color: "#374151",
    fontFamily: "Righteous-Regular",
    fontSize: 14,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 10,
    flex: 1,
    minWidth: "48%",
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    color: "#374151",
    fontFamily: "Righteous-Regular",
    fontSize: 14,
  },
  calendarPopup: {
    position: "absolute",
    top: 100,
    left: "2.5%",
    zIndex: 1000,
    backgroundColor: "white",
    borderRadius: 15,
    width: "95%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  calendarContainer: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 15,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  calendarTitle: {
    fontSize: 14,
    color: "#374151",
    fontFamily: "Righteous-Regular",
    marginHorizontal: 10,
  },
  calendarDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  calendarDayName: {
    color: "#6b7280",
    fontSize: 12,
    width: 35,
    textAlign: "center",
    fontFamily: "Righteous-Regular",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  calendarDay: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 8,
  },
  calendarDayText: {
    color: "#374151",
    fontFamily: "Righteous-Regular",
    fontSize: 14,
  },
  selectedDay: {
    backgroundColor: "#696999",
  },
  selectedDayText: {
    color: "white",
  },
  todayDay: {
    borderWidth: 1.5,
    borderColor: "#696999",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 12,
  },
  statBox: {
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    width: "30%",
    minHeight: 90,
    justifyContent: "center",
  },
  presentBox: {
    backgroundColor: "#4ade80",
  },
  absentBox: {
    backgroundColor: "#f87171",
  },
  lateBox: {
    backgroundColor: "#fbbf24",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "white",
    marginTop: 4,
    fontFamily: "Righteous-Regular",
    textAlign: "center",
  },
  attendanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  studentName: {
    fontSize: 15,
    color: "white",
    flex: 1,
    fontFamily: "Righteous-Regular",
  },
  attendanceContainer: {
    alignItems: "flex-end",
  },
  attendanceLabel: {
    fontSize: 12,
    color: "white",
    opacity: 0.9,
    fontFamily: "Righteous-Regular",
  },
  attendanceValue: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Righteous-Regular",
  },
  
  tipContainer: {
    backgroundColor: "rgba(105, 105, 153, 0.1)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 8,
    marginHorizontal: 15,
  },
  tipText: {
    color: "#696999",
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Righteous-Regular",
  },
  mainScrollView: {
    flex: 1,
  },
  studentListContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
})