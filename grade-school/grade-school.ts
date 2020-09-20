export default class GradeSchool {
  private _db: Map<number, string[]>;

  constructor() {
    this._db = new Map();
  }

  studentRoster() {
    const copy: Map<string, string[]> = new Map();
    for (const [grade, names] of this._db.entries()) {
      copy.set(String(grade), [...names]);
    }
    return copy;
  }

  addStudent(name: string, grade: number) {
    this._db.set(grade, [...this.studentsInGrade(grade), name].sort());
  }

  studentsInGrade(grade: number) {
    return [...(this._db.get(grade) || [])];
  }
}
