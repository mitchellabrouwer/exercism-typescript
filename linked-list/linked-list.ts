interface INode<T> {
  data?: T | null
  previous?: Node<T> | Sentinel<T> | null
  next?: Node<T> | Sentinel<T> | null
}

class Sentinel<T> implements INode<T> {
  public data?: T | null
  public previous?: Node<T> | Sentinel<T> | null
  public next?: Node<T> | Sentinel<T> | null
  // static isSentinel = true

  constructor(data?: T | null, previous?: Node<T> | Sentinel<T> | null, next?: Node<T> | Sentinel<T> | null) {
    this.data = data || null
    this.previous = previous || null
    this.next = next || null
  }

  isSentinel() {
    return true
  }
}

class Node<T> implements INode<T> {
  public data: T
  public previous: Node<T> | Sentinel<T>
  public next: Node<T> | Sentinel<T>
  // static isSentinel = false

  constructor(data: T, previous: Node<T> | Sentinel<T>, next: Node<T> | Sentinel<T>) {
    this.data = data
    this.previous = previous
    this.next = next
  }

  isSentinel() {
    return false
  }
}

export default class LinkedList<T> {
  private _start: Sentinel<T>
  private _end: Sentinel<T>

  constructor() {
    this._start = new Sentinel()
    this._end = new Sentinel(null, this._start)

    this._start.next = this._end
  }

  get head() {
    if (this._start.next instanceof Node) return this._start.next
  }

  get tail() {
    if (this._end.previous instanceof Node) return this._end.previous
  }

  count() {
    let node = this.head
    let counter = 0

    while (node instanceof Node) {
      counter += 1
      if (node.next instanceof Node) node = node.next
      else return counter
    }

    return counter
  }

  add(data: T, before: Node<T> | Sentinel<T>, after: Node<T> | Sentinel<T>) {
    const node = new Node(data, before, after)

    before.next = node
    after.previous = node
    return node
  }

  remove(node: Node<T>) {
    node.previous.next = node.next
    node.next.previous = node.previous

    return node
  }

  find(value: T) {
    let node = this.head

    while (node && !node.isSentinel()) {
      if (node.data === value) return node
      node = node.next
    }
  }

  delete(value: T) {
    const node = value && this.find(value)
    if (node) return this.remove(node)
  }

  push(data: T) {
    this.add(data, this.tail || this._start, this._end)
  }

  unshift(data: T) {
    this.add(data, this._start, this.head || this._end)
  }

  pop() {
    if (this?.tail?.data) return this.delete(this.tail.data)?.data
  }

  shift() {
    if (this?.head?.data) return this.delete(this.head.data)?.data
  }
}
