import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TaskEdit, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(title: string) {

    if (tasks.find(task => task.title === title)) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return
    }

    setTasks(
      [
        ...tasks, {
          id: new Date().getTime(),
          title,
          done: false,
        }
      ])
  }

  function handleToggleTaskDone(id: number) {
    setTasks(
      tasks.map(task => {
        if (task.id !== id) return task
        return { ...task, done: !task.done }
      })
    )
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => {
            setTasks(
              tasks.filter(task => task.id !== id)
            )
          },
          style: 'cancel'
        }
      ]
    )
  }

  function handleEditTask({ id, title }: TaskEdit) {
    setTasks(
      tasks.map(task => {
        if (task.id !== id) return task
        return { ...task, title }
      })
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})