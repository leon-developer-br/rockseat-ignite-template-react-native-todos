import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Task, TaskEdit } from './TasksList';
import editIcon from '../assets/icons/edit/edit.png'
import trashIcon from '../assets/icons/trash/trash.png'
import cancelIcon from '../assets/icons/cancel/cancel.png'


export interface TaskItemProps {
    task: Task;
    index: number;
    toggleTaskDone: (id: number) => void;
    editTask: (props: TaskEdit) => void;
    removeTask: (id: number) => void;
}

export function TaskItem({ task, index, toggleTaskDone, editTask, removeTask }: TaskItemProps) {

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(task.title)
    const textInputRef = useRef<TextInput>(null)

    const handleStartEditing = () => {
        setIsEditing(true)
    }

    const handleCancelEditing = () => {
        setIsEditing(false)
        setTitle(task.title)
    }

    const handleSubmitEditing = () => {
        editTask({ id: task.id, title })
        setIsEditing(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing])

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={[task.done ? styles.taskMarkerDone : styles.taskMarker]}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={16}
                                color="#E5E5E5"
                            />
                        )}
                    </View>

                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.iconsContainer}>
                {
                    isEditing ?
                        <TouchableOpacity
                            testID={`edit-${index}`}
                            style={{ paddingHorizontal: 12 }}
                            onPress={handleCancelEditing}
                        >
                            <Image source={cancelIcon} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            testID={`edit-${index}`}
                            style={{ paddingHorizontal: 12 }}
                            onPress={handleStartEditing}
                        >
                            <Image source={editIcon} />
                        </TouchableOpacity>
                }

                <View
                    style={styles.iconsDivider}
                />

                <TouchableOpacity
                    disabled={isEditing}
                    onPress={() => removeTask(task.id)}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                </TouchableOpacity>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24
    },
    iconsDivider: {
        width: 3,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal: 11
    }
})