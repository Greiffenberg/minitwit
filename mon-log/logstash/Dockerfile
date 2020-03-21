# https://www.docker.elastic.co/
FROM docker.elastic.co/logstash/logstash:7.6.0

COPY /mon-log/logstash/config/logstash.yml /usr/share/logstash/config/logstash.yml
COPY /mon-log/logstash/pipeline /usr/share/logstash/pipeline

# Add your logstash plugins setup here
# Example: RUN logstash-plugin install logstash-filter-json