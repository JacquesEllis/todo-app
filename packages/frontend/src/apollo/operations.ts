import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      completed
      createdAt
      completedAt
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      completed
      createdAt
      completedAt
    }
  }
`;

export const MARK_COMPLETE = gql`
  mutation MarkComplete($id: ID!, $completed: Boolean!) {
    updateTask(id: $id, completed: $completed) {
      id
      title
      completed
      createdAt
      completedAt
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;
