import type { Handler } from "@netlify/functions";
import { getDb, initializeDatabase, Tank } from "./db";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

export const handler: Handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    // Initialize database on first request
    await initializeDatabase();

    const sql = getDb();
    const { httpMethod } = event;

    switch (httpMethod) {
      case "GET":
        // Get all tanks
        const tanks = await sql`
          SELECT id, beer_type, volume_liters, capacity_liters, status, 
                 created_at, updated_at 
          FROM tanks 
          ORDER BY id
        `;

        // Transform to match frontend interface
        const transformedTanks = tanks.map((tank) => ({
          id: tank.id,
          beerType: tank.beer_type,
          volumeLiters: tank.volume_liters,
          capacityLiters: tank.capacity_liters,
          status: tank.status,
        }));

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(transformedTanks),
        };

      case "POST":
        // Create new tank
        if (!event.body) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: "Request body is required" }),
          };
        }

        const newTank = JSON.parse(event.body);

        await sql`
          INSERT INTO tanks (id, beer_type, volume_liters, capacity_liters, status)
          VALUES (${newTank.id}, ${newTank.beerType}, ${newTank.volumeLiters}, 
                  ${newTank.capacityLiters}, ${newTank.status})
        `;

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({ message: "Tank created successfully" }),
        };

      case "PUT":
        // Update tank
        if (!event.body) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: "Request body is required" }),
          };
        }

        const updatedTank = JSON.parse(event.body);

        await sql`
          UPDATE tanks 
          SET beer_type = ${updatedTank.beerType},
              volume_liters = ${updatedTank.volumeLiters},
              capacity_liters = ${updatedTank.capacityLiters},
              status = ${updatedTank.status},
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ${updatedTank.id}
        `;

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: "Tank updated successfully" }),
        };

      case "DELETE":
        // Delete tank
        const tankId = event.queryStringParameters?.id;

        if (!tankId) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: "Tank ID is required" }),
          };
        }

        await sql`DELETE FROM tanks WHERE id = ${tankId}`;

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: "Tank deleted successfully" }),
        };

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: "Method not allowed" }),
        };
    }
  } catch (error) {
    console.error("Database error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
