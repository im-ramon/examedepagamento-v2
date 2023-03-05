FROM alpine:latest

ARG PB_VERSION=0.13.1

RUN apk add --no-cache \
    unzip \
    ca-certificates

RUN apk update
RUN addgroup -S pocketbase && adduser -S pocketbase -G pocketbase

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/
RUN mkdir pb/pb_data

RUN chown -R pocketbase:pocketbase /pb
RUN chmod -R 710 /pb

USER pocketbase

EXPOSE 8090
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090"]

# docker build -t pocketbase .
# docker run -d -p 8090:8090 -v /home/deploy/examedepagamento/pb_data:/pb/pb_data pocketbase