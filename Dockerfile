FROM docker.io/rust:slim-bullseye as builder
WORKDIR /usr/src/flipkart-scraper-api
RUN apt update && apt install -y libssl-dev
ENV DEPLOYMENT_URL localhost:3000
ENV OPENSSL_LIB_DIR=/usr/lib/x86_64-linux-gnu
ENV OPENSSL_INCLUDE_DIR=/usr/include
COPY Cargo.toml .
COPY ./src/ ./src
RUN cargo build --release

FROM docker.io/debian:bullseye-slim
RUN apt update && apt install -y ca-certificates
WORKDIR /usr/local/bin/
COPY --from=builder /usr/src/flipkart-scraper-api/target/release/flipkart-scraper-api .

CMD ["flipkart-scraper-api"]
EXPOSE 3000
