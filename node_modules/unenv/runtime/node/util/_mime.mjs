export class MIMEType {
  constructor(input) {
    this.params = new MIMEParams();
    const [essense = "", ...params] = String(input).split(";");
    const [type = "", subtype = ""] = essense.split("/");
    this.type = type;
    this.subtype = subtype;
    this.params = new MIMEParams();
    for (const param of params) {
      const [name, value] = param.split("=");
      this.params.set(name, value);
    }
  }
  get essence() {
    return this.type + "/" + this.subtype;
  }
  toString() {
    const paramsStr = this.params.toString();
    return this.essence + (paramsStr ? `;${paramsStr}` : "");
  }
}
export class MIMEParams extends Map {
  get(name) {
    return super.get(name) || null;
  }
  toString() {
    return [...this.entries()].map(([name, value]) => `${name}=${value}`).join("&");
  }
}
