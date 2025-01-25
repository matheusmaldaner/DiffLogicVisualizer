class NodeGate {
    index: string;
    gate: string;
    left: string;
    right: string;
  
    constructor(index: string, gate: string, left: string, right: string) {
      this.index = index;
      this.gate = gate;
      this.left = left;
      this.right = right;
    }
  
    // You can also add any methods to manipulate or retrieve data if necessary
    displayNodeInfo() {
      return `Node index: ${this.index}, Gate: ${this.gate}, Left: ${this.left}, Right: ${this.right}`;
    }
  }

  export default NodeGate;
  