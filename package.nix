{
  lib,
  rustPlatform,
  installShellFiles,
  makeBinaryWrapper,
  openssl,
  pkg-config,
  rev ? "dirty",
}:

let
  cargoToml = builtins.fromTOML (builtins.readFile ./Cargo.toml);
  pname = "flipkart-scraper-api";
  version = "${cargoToml.package.version}-${rev}";
in
rustPlatform.buildRustPackage {
  inherit pname;
  inherit version;
  src = lib.fileset.toSource {
    root = ./.;
    fileset = lib.fileset.intersection (lib.fileset.fromSource (lib.sources.cleanSource ./.)) (
      lib.fileset.unions [
        ./src
        ./Cargo.toml
        ./Cargo.lock
      ]
    );
  };

  useFetchCargoVendor = true;
  cargoLock = {
    lockFile = ./Cargo.lock;
  };

  nativeBuildInputs = [
    installShellFiles
    makeBinaryWrapper
    openssl
    pkg-config
  ];

  buildInputs = [
    openssl
  ];

  meta = {
    description = "Unofficial flipkart scraper api to fetch product details and search on flipkart.com";
    license = lib.licenses.asl20;
    maintainers = with lib.maintainers; [ imsick ];
  };
}
