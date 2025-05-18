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
      deployUrl = "localhost:3000";
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
            DEPLOYMENT_URL = deployUrl;
          };
        };
      });

      packages = supportedSystems (pkgs: rec {
        flipkart-scraper-api = pkgs.callPackage ./package.nix {
          inherit rev;
          inherit deployUrl;
        };
        default = flipkart-scraper-api;
      });
    };
}
