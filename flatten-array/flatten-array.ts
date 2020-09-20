type Nested<T> = NestedArray<T> | T | undefined;
type NestedArray<T> = Array<Nested<T>>;

class FlattenArray<T> {
  flatten(array: NestedArray<T>, flatArray: T[] = []) {
    array.forEach((item) => {
      if (item === undefined) {
        return;
      } else if (Array.isArray(item)) {
        this.flatten(item, flatArray);
      } else {
        flatArray.push(item);
      }
    });

    return flatArray;
  }
}

export default new FlattenArray<number>();
