// src/services/rolesApi.ts
import { ROLES_ENDPOINT } from './apiConfig';

export interface Role {
  id?: string;
  roleId?: string;
  roleName: string;
  roleCode: string;
  description: string;
  permission: string[];
  status: string;
  updatedAt?: string;
  createdAt?: string;
}

// GET all roles
export const getAllRoles = async (): Promise<Role[]> => {
  try {
    const response = await fetch(ROLES_ENDPOINT);
    if (!response.ok) {
      throw new Error(`Failed to fetch roles: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

// GET role by ID
export const getRoleById = async (id: string): Promise<Role> => {
  try {
    const response = await fetch(`${ROLES_ENDPOINT}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch role: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching role ${id}:`, error);
    throw error;
  }
};

// POST create new role
export const createRole = async (role: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Promise<Role> => {
  try {
    const response = await fetch(ROLES_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(role),
    });
    if (!response.ok) {
      throw new Error(`Failed to create role: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
};

// PUT update role
export const updateRole = async (id: string, role: Partial<Role>): Promise<Role> => {
  try {
    const response = await fetch(`${ROLES_ENDPOINT}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(role),
    });
    if (!response.ok) {
      throw new Error(`Failed to update role: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating role ${id}:`, error);
    throw error;
  }
};

// DELETE role
export const deleteRole = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${ROLES_ENDPOINT}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete role: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting role ${id}:`, error);
    throw error;
  }
};

