class Bob {
  hasLowercase = (message: string) => /[a-z]/.test(message);
  hasUppercase = (message: string) => /[A-Z]/.test(message);
  isYell = (message: string) => this.hasUppercase(message) && !this.hasLowercase(message);
  isQuestion = (message: string) => /^.+\?$/.test(message);
  isSilence = (message: string) => message === '';

  hey(message: string) {
    const msg = message.trim();
    if (this.isSilence(msg)) return 'Fine. Be that way!';
    if (this.isYell(msg) && this.isQuestion(msg)) return "Calm down, I know what I'm doing!";
    if (this.isYell(msg)) return 'Whoa, chill out!';
    if (this.isQuestion(msg)) return 'Sure.';
    return 'Whatever.';
  }
}

export default Bob;
