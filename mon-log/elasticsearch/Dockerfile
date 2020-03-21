# https://www.docker.elastic.co/
FROM docker.elastic.co/elasticsearch/elasticsearch:7.6.0

COPY ./mon-log/elasticsearch/config/elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml

# Add your elasticsearch plugins setup here
# Example: RUN elasticsearch-plugin install analysis-icu