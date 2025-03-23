import { createContext, useContext, useState } from 'react';

const SubjectsContext = createContext();

export function SubjectsProvider({ children }) {
  const [subjects, setSubjects] = useState([]);

  const addSubject = (newSubject) => {
    setSubjects(prev => [...prev, {
      ...newSubject,
      groups: []
    }]);
  };

  const addGroupToSubject = (subjectId, newGroup) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === subjectId ? {
        ...subject,
        groups: [...subject.groups, {
          ...newGroup,
          weights: [],
          students: [
            { id: 1, name: 'Estudiante 1', participaciones: 0, calificaciones: {}, asistencia: [] },
            { id: 2, name: 'Estudiante 2', participaciones: 0, calificaciones: {}, asistencia: [] }
          ]
        }]
      } : subject
    ));
  };

  const updateGroupWeights = (groupId, weights) => {
    setSubjects(prev => prev.map(subject => ({
      ...subject,
      groups: subject.groups.map(group => 
        group.id === groupId ? { ...group, weights } : group
      )
    })));
  };

  return (
    <SubjectsContext.Provider value={{
      subjects,
      addSubject,
      addGroupToSubject,
      updateGroupWeights
    }}>
      {children}
    </SubjectsContext.Provider>
  );
}

export const useSubjects = () => useContext(SubjectsContext);