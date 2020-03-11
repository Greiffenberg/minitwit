FROM grafana/grafana:latest

COPY monitoring/grafana/dashboards/ ./var/lib/grafana/dashboards/
COPY monitoring/grafana/config.ini ./etc/grafana/config.ini
COPY monitoring/grafana/provisioning ./etc/grafana/provisioning