class NodeGate {
    index: string;
    gate: string;
    left: string;
    right: string;
    a: boolean;
  
    constructor(index: string, gate: string, left: string, right: string, a: boolean) {
      this.index = index;
      this.gate = gate;
      this.left = left;
      this.right = right;
      this.a = a;
    }
  
    // You can also add any methods to manipulate or retrieve data if necessary
    displayNodeInfo() {
      return `Node index: ${this.index}, Gate: ${this.gate}, Left: ${this.left}, Right: ${this.right}`;
    }
  }

  export default NodeGate;
  