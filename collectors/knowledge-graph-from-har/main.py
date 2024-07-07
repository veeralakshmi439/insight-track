import json
from gremlin_python.structure.graph import Graph
from gremlin_python.driver.driver_remote_connection import DriverRemoteConnection
from gremlin_python.process.graph_traversal import __
from haralyzer import HarParser

# Configuration for the Gremlin server
gremlin_server_url = 'ws://localhost:8182/gremlin'  # Replace with your Gremlin server URL

# Connect to the Gremlin server
connection = DriverRemoteConnection(gremlin_server_url, 'g')
graph = Graph()
g = graph.traversal().withRemote(connection)

def read_har_file(har_file_path):
    with open(har_file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def create_knowledge_graph_from_har(har_data):
    try:
        parser = HarParser(har_data)
        for entry in parser.har_data['entries']:
            request_url = entry['request']['url']
            request_method = entry['request']['method']
            response_status = entry['response']['status']
            response_content_type = entry['response']['content']['mimeType']
            response_code = entry['response']['status']
            connection_id = entry.get('connection', 'unknown')  # Adjust the key based on the HAR structure
            initiator = entry.get('pageref', 'unknown')  # Adjust the key based on the HAR structure

            # Create or get the existing connection ID vertex
            connection_id_vertex = g.V().hasLabel('connection_id').has('id', connection_id).fold().coalesce(
                __.unfold(),
                __.addV('connection_id').property('id', connection_id)
            ).next()

            # Create or get the existing initiator vertex
            initiator_vertex = g.V().hasLabel('initiator').has('id', initiator).fold().coalesce(
                __.unfold(),
                __.addV('initiator').property('id', initiator)
            ).next()

            # Create vertices for requests and responses
            request_vertex = g.addV('request').property('url', request_url).property('method', request_method).next()
            response_vertex = g.addV('response').property('status', response_status).property('contentType', response_content_type).next()

            # Create edges
            g.V(request_vertex.id).addE('produces').to(__.V(response_vertex.id)).next()
            g.V(request_vertex.id).addE('belongs_to_connection').to(__.V(connection_id_vertex.id)).next()
            g.V(request_vertex.id).addE('initiated_by').to(__.V(initiator_vertex.id)).next()

        print('Knowledge graph created successfully from HAR data.')
    except Exception as e:
        print('Error creating the knowledge graph from HAR:', str(e))
    finally:
        connection.close()

def main():
    har_file_path = 'www.google.com.har'  # Replace with the path to your HAR file
    har_data = read_har_file(har_file_path)
    create_knowledge_graph_from_har(har_data)

if __name__ == '__main__':
    main()
