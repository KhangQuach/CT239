export default function RemoveActiveEdgesResult(edges, setEdges) {
  const updatedEdges = edges.map(edge => {
    // Remove the animated and style properties
    const { animated, style, ...rest } = edge;
    return { ...rest }; // Return the edge without animated and style
  });

  setEdges(updatedEdges); // Update the state with the new edges
}