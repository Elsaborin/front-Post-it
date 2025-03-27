"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native"
import { ChevronLeft, ChevronRight } from "lucide-react-native"

// Constantes para los estados de asistencia
const ATTENDANCE_STATUS = {
  PRESENT: "present",
  ABSENT: "absent",
  LATE: "late",
}

const AttendanceEditModal = ({ visible, onClose, student, onUpdateAttendance, initialDate, savedAttendances }) => {
  const [localModalDate, setLocalModalDate] = useState(initialDate || new Date())

  // Actualizar la fecha local cuando cambia la fecha inicial
  useEffect(() => {
    if (initialDate) {
      setLocalModalDate(initialDate)
    }
  }, [initialDate])

  if (!student) return null

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  }

  const modalDateStr = formatDate(localModalDate)
  const currentStatus = savedAttendances[modalDateStr]?.[student.id] || student.attendance[modalDateStr] || null

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const daysInMonth = new Date(localModalDate.getFullYear(), localModalDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(localModalDate.getFullYear(), localModalDate.getMonth(), 1).getDay()

  const previousMonth = () => {
    setLocalModalDate(new Date(localModalDate.getFullYear(), localModalDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setLocalModalDate(new Date(localModalDate.getFullYear(), localModalDate.getMonth() + 1, 1))
  }

  const getStatusColor = (day) => {
    const date = new Date(localModalDate.getFullYear(), localModalDate.getMonth(), day)
    const dateStr = formatDate(date)
    const status = savedAttendances[dateStr]?.[student.id] || student.attendance[dateStr]

    switch (status) {
      case ATTENDANCE_STATUS.PRESENT:
        return "#4ade80"
      case ATTENDANCE_STATUS.ABSENT:
        return "#f87171"
      case ATTENDANCE_STATUS.LATE:
        return "#fbbf24"
      default:
        return "transparent"
    }
  }

  const selectDate = (day) => {
    const newDate = new Date(localModalDate.getFullYear(), localModalDate.getMonth(), day)
    setLocalModalDate(newDate)
  }

  const isToday = (day) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      localModalDate.getMonth() === today.getMonth() &&
      localModalDate.getFullYear() === today.getFullYear()
    )
  }

  const isSelectedDay = (day) => {
    return day === localModalDate.getDate()
  }

  const handleAttendanceUpdate = (status) => {
    onUpdateAttendance(student.id, modalDateStr, status, () => {
      // Forzar actualización del calendario
      setLocalModalDate(new Date(localModalDate))
    })
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Asistencias - {student.name}</Text>

          <View style={styles.modalCalendarHeader}>
            <TouchableOpacity onPress={previousMonth}>
              <ChevronLeft size={24} color="#696999" />
            </TouchableOpacity>
            <Text style={styles.modalCalendarTitle}>
              {monthNames[localModalDate.getMonth()]} {localModalDate.getFullYear()}
            </Text>
            <TouchableOpacity onPress={nextMonth}>
              <ChevronRight size={24} color="#696999" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalCalendarDays}>
            {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"].map((day) => (
              <Text key={day} style={styles.modalCalendarDayName}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.modalCalendarGrid}>
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <View key={`empty-${index}`} style={styles.modalCalendarDay} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const statusColor = getStatusColor(day)
              return (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.modalCalendarDay,
                    { backgroundColor: statusColor !== "transparent" ? statusColor : "transparent" },
                    isSelectedDay(day) && styles.modalSelectedDay,
                    isToday(day) && styles.modalTodayDay,
                  ]}
                  onPress={() => selectDate(day)}
                >
                  <Text
                    style={[
                      styles.modalCalendarDayText,
                      statusColor !== "transparent" && styles.modalColoredDayText,
                      isSelectedDay(day) && styles.modalSelectedDayText,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>

          <View style={styles.modalStudentInfo}>
            <View style={styles.modalAvatar}>
              <Text style={styles.modalAvatarText}>{student.name[0]}</Text>
            </View>
            <View>
              <Text style={styles.modalStudentName}>{student.name}</Text>
              <Text style={styles.modalDateText}>
                Fecha:{" "}
                {localModalDate.toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })}
              </Text>
            </View>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, currentStatus === ATTENDANCE_STATUS.PRESENT && styles.presentButton]}
              onPress={() => handleAttendanceUpdate(ATTENDANCE_STATUS.PRESENT)}
            >
              <Text
                style={[styles.modalButtonText, currentStatus === ATTENDANCE_STATUS.PRESENT && styles.activeButtonText]}
              >
                Presente
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, currentStatus === ATTENDANCE_STATUS.ABSENT && styles.absentButton]}
              onPress={() => handleAttendanceUpdate(ATTENDANCE_STATUS.ABSENT)}
            >
              <Text
                style={[styles.modalButtonText, currentStatus === ATTENDANCE_STATUS.ABSENT && styles.activeButtonText]}
              >
                Ausente
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, currentStatus === ATTENDANCE_STATUS.LATE && styles.lateButton]}
              onPress={() => handleAttendanceUpdate(ATTENDANCE_STATUS.LATE)}
            >
              <Text
                style={[styles.modalButtonText, currentStatus === ATTENDANCE_STATUS.LATE && styles.activeButtonText]}
              >
                Retraso
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    width: "90%",
    maxWidth: 400,
    overflow: "hidden",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 15,
    padding: 15,
    fontFamily: "Righteous-Regular",
  },
  modalCalendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  modalCalendarTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    fontFamily: "Righteous-Regular",
  },
  modalCalendarDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  modalCalendarDayName: {
    color: "#6b7280",
    fontSize: 12,
    width: 30,
    textAlign: "center",
    fontFamily: "Righteous-Regular",
  },
  modalCalendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  modalCalendarDay: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 15,
  },
  modalCalendarDayText: {
    color: "#374151",
    fontFamily: "Righteous-Regular",
  },
  modalColoredDayText: {
    color: "white",
  },
  modalSelectedDay: {
    borderWidth: 2,
    borderColor: "#000",
  },
  modalSelectedDayText: {
    fontWeight: "bold",
  },
  modalTodayDay: {
    borderWidth: 1,
    borderColor: "#696999",
  },
  modalStudentInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  modalAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#696999",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  modalAvatarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Righteous-Regular",
  },
  modalStudentName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    fontFamily: "Righteous-Regular",
  },
  modalDateText: {
    fontSize: 12,
    color: "#6b7280",
    fontFamily: "Righteous-Regular",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    marginHorizontal: 5,
  },
  presentButton: {
    backgroundColor: "#4ade80",
  },
  absentButton: {
    backgroundColor: "#f87171",
  },
  lateButton: {
    backgroundColor: "#fbbf24",
  },
  modalButtonText: {
    color: "#374151",
    fontWeight: "500",
    fontFamily: "Righteous-Regular",
  },
  activeButtonText: {
    color: "white",
  },
  closeButton: {
    backgroundColor: "#696999",
    paddingVertical: 15,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "600",
    fontFamily: "Righteous-Regular",
  },
})

export default AttendanceEditModal

