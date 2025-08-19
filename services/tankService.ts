import type { Tank } from "../types";

const API_BASE_URL = "/.netlify/functions";

export class TankService {
  static async getAllTanks(): Promise<Tank[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/tanks`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching tanks:", error);
      throw error;
    }
  }

  static async createTank(tank: Tank): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/tanks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tank),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating tank:", error);
      throw error;
    }
  }

  static async updateTank(tank: Tank): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/tanks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tank),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating tank:", error);
      throw error;
    }
  }

  static async deleteTank(tankId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/tanks?id=${tankId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting tank:", error);
      throw error;
    }
  }
}
