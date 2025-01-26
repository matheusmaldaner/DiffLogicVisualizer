class NodeGate {
    index: string;
    gate: string;
    left: string;
    right: string;
    a: boolean;
    probabilities: Record<string, number>
  
    constructor(index: string, gate: string, left: string, right: string, a: boolean, probabilities: Record<string, number>) {
      this.index = index;
      this.gate = gate;
      this.left = left;
      this.right = right;
      this.a = a;
      this.probabilities = probabilities;
    }
  
    // You can also add any methods to manipulate or retrieve data if necessary
    displayNodeInfo() {
      return `Node index: ${this.index}, Gate: ${this.gate}, Left: ${this.left}, Right: ${this.right}`;
    }
  }

  export default NodeGate;
  