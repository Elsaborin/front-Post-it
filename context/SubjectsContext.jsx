import { createContext, useContext, useState } from 'react';

const SubjectsContext = createContext();

export function SubjectsProvider({ children }) {
  const [subjects, setSubjects] = useState([]);

  const addSubject = (newSubject) => {
    setSubjects(prev => [...prev, newSubject]);
  };

  const addGroupToSubject = (subjectId, newGroup) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === subjectId 
        ? { 
            ...subject, 
            groups: [...subject.groups, newGroup].filter(
              (v, i, a) => a.findIndex(t => t.id === v.id) === i
            ) 
          } 
        : subject
    ));
  };

  return (
    <SubjectsContext.Provider value={{ subjects, addSubject, addGroupToSubject }}>
      {children}
    </SubjectsContext.Provider>
  );
}

export const useSubjects = () => useContext(SubjectsContext);