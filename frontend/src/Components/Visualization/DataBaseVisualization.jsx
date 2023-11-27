import React, { useEffect } from "react";
import mermaid from "react-mermaid";

function DatabaseSchemaVisualization() {
  useEffect(() => {
   
    const schema = `
      graph TD
        Customers --> Orders
        Orders --> OrderDetails
        Products --> OrderDetails
    `;

    // Render the schema using Mermaid
    mermaid.initialize({ startOnLoad: true });
    mermaid.render("schema-diagram", schema);
  }, []);

  return (
    <div>
      <h2>Database Schema Visualization</h2>
      <div id="schema-diagram" style={{ height: "100px" }}></div>
    </div>
  );
}

export default DatabaseSchemaVisualization;
