const MeowcoinKey = require("./dist/main");

test("Random mnemonic should contain 12 words", () => {
  const mnemonic = MeowcoinKey.generateMnemonic();
  expect(mnemonic.split(" ").length).toBe(12);
});

test("Validate address on main-net", () => {
  const network = "mewc";
  const mnemonic =
    "orphan resemble brain dwarf bus fancy horn among cricket logic duty crater";
  const address = MeowcoinKey.getAddressPair(network, mnemonic, 0, 1);
  expect(address.external.address).toBe("MPo9vi3QM4JqfxGxysFD8xbqFZBSzZAqeG");
});

test("Validate Wallet Import Format (WIF) main-net ", () => {
  const network = "mewc";
  const mnemonic =
    "orphan resemble brain dwarf bus fancy horn among cricket logic duty crater";
  const address = MeowcoinKey.getAddressPair(network, mnemonic, 0, 1);

  expect(address.internal.address).toBe("MVVPZUYZ5QP2xBF5e8gLLvWc2EMhksE5Ns");
  expect(address.external.WIF).toBe("Hepsf5dCQfjQCPfWhcP5f275iPN6HqUS39asZwJ8mGHf9SufS9bM");
});

test("Validate get public address from Wallet Import Format (WIF) main-net ", () => {
  const network = "mewc";
  const WIF = "Hepsf5dCQfjQCPfWhcP5f275iPN6HqUS39asZwJ8mGHf9SufS9bM";
  const addressObject = MeowcoinKey.getAddressByWIF(network, WIF);

  expect(addressObject.address).toBe("MPo9vi3QM4JqfxGxysFD8xbqFZBSzZAqeG");
});

test("Valid bytes to mnemonic", () => {
  const hexString = "a10a95fb55808c5f15dc97ecbcd26cf0";
  const bytes = Uint8Array.from(Buffer.from(hexString, "hex"));
  const mnemonic = MeowcoinKey.entropyToMnemonic(bytes);
  expect(mnemonic).toBe(
    "patient feed learn prison angle convince first napkin uncover track open theory"
  );
});

test("Non valid bytes to mnemonic should fail", () => {
  const hexString = "a10a94fb55808c5f15dc97ecbcd26cf0";
  const bytes = Uint8Array.from(Buffer.from(hexString, "hex"));
  const mnemonic = MeowcoinKey.entropyToMnemonic(bytes);
  expect(mnemonic).not.toBe(
    "patient feed learn prison angle convince first napkin uncover track open theory"
  );
});

describe("Validate diff languages", () => {
  it("Should accept spanish mnemonic", () => {
    const m =
      "velero nuera pepino reír barro reforma negar rumbo atento separar pesa puma";
    const valid = MeowcoinKey.isMnemonicValid(m);
    expect(valid).toBe(true);
  });

  it("Should accept French mnemonic", () => {
    const m =
      "vaseux mixte ozone quiétude besogne punaise membre réussir avarice samedi pantalon poney";
    const valid = MeowcoinKey.isMnemonicValid(m);
    expect(valid).toBe(true);
  });
});

it("Should accept Italian mnemonic", () => {
  const m =
    "veloce perforare recinto sciroppo bici scelto parabola sguardo avanzato sonnifero remoto rustico";
  const valid = MeowcoinKey.isMnemonicValid(m);
  expect(valid).toBe(true);
});

describe("generateAddress", () => {
  it("should generate an address with a mnemonic", () => {
    const result = MeowcoinKey.generateAddressObject();

    expect(result).toHaveProperty("mnemonic");
    expect(result.mnemonic).toBeDefined();
    expect(result.network).toBe("mewc");
    expect(result).toHaveProperty("address");
  });

  // it("default network should be tls for Telestai", () => {
  //   const network = "tls-test";
  //   const result = TelestaiKey.generateAddressObject(network);
  //   expect(result.network).toBe(network);
  // });

  // it("Should handle tls", () => {
  //   const network = "tls-test";
  //   const result = TelestaiKey.generateAddressObject(network);
  //   expect(result.network).toBe(network);
  // });
});
