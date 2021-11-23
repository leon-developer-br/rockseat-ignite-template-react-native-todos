import React from 'react';
import { FlatList } from 'react-native';
import { ItemWrapper } from './ItemWrapper';
import { TaskItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface TaskEdit {
  id: number;
  title: string;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  editTask: (props: TaskEdit) => void;
  removeTask: (id: number) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem task={item} index={index} toggleTaskDone={toggleTaskDone} editTask={editTask} removeTask={removeTask} />
          </ItemWrapper >
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}
