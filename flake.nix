{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      supportedSystems =
        function:
        nixpkgs.lib.genAttrs [
          "x86_64-linux"
          "aarch64-linux"
          "x86_64-darwin"
          "aarch64-darwin"
        ] (system: function nixpkgs.legacyPackages.${system});
      rev = self.shortRev or self.dirtyShortRev or "dirty";
    in
    {
      devShells = supportedSystems (pkgs: {
        default = pkgs.mkShell {
          buildInputs = with pkgs; [
            cargo
            pkg-config
            openssl
          ];
          env = {
            DEPLOYMENT_URL = "localhost:3000";
          };
        };
      });

      packages = supportedSystems (pkgs: rec {
        flipkart-scraper-api = pkgs.callPackage ./package.nix {
          inherit rev;
        };
        default = flipkart-scraper-api;
      });
    };
}
