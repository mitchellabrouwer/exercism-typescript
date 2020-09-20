const BITMASK_TO_SECRET = {
  1: (actions: string[]) => actions.concat("wink"),
  2: (actions: string[]) => actions.concat("double blink"),
  4: (actions: string[]) => actions.concat("close your eyes"),
  8: (actions: string[]) => actions.concat("jump"),
  16: (actions: string[]) => actions.reverse(),
};

export default class HandShake {
  constructor(private bitmask: number) {}

  hasAction(flag: string) {
    return Number(flag) & this.bitmask;
  }

  commands() {
    let actions: string[] = [];

    for (const [flag, command] of Object.entries(BITMASK_TO_SECRET)) {
      if (this.hasAction(flag)) {
        actions = command(actions);
      }
    }

    return actions;
  }
}
