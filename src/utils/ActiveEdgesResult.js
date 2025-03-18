export default function ActiveEdgesResult(edges, setEdges, edgeList, direct) {
  // Prepare edgeList for comparison by removing the 'e' prefix
  const comparisonEdgeList = edgeList.map(resultId => resultId.replace('e', ''));

  if (direct === 'undirected') {
    const updatedEdges = edges.map(edge => {
      // Check if the edge in edgeList matches the edge in edges, considering undirected (order doesn't matter)
      const isMatch = comparisonEdgeList.some(resultId => {
        if (resultId === null) return false;
        // Handle the case where the edge is undirected
        const [resultSource, resultTarget] = resultId.split('-');
        const [edgeSource, edgeTarget] = edge.id.replace('e', '').split('-');
        // Check if the edges match in any order (undirected)
        return (resultSource === edgeSource && resultTarget === edgeTarget) ||
          (resultSource === edgeTarget && resultTarget === edgeSource);
      });
      if (isMatch) {
        return { ...edge, animated: true, style: { stroke: 'red' } }; // Add animated property
      }
      return edge;
    });
    setEdges(updatedEdges); // Update the state with the new edges
  }

  if (direct === 'directed') {
    const updatedEdges = edges.map(edge => {
      // Check if the edge in edgeList matches the edge in edges (directed)
      const isMatch = comparisonEdgeList.some(resultId => {
        if (resultId === null) return false;
        // If the edge is directed, check for an exact match
        return resultId === edge.id.replace('e', '');
      });
      if (isMatch) {
        return { ...edge, animated: true, style: { stroke: 'red' } }; // Add animated property
      }
      return edge;
    });
    setEdges(updatedEdges);
  }
}