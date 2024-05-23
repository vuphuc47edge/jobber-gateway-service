import { Client } from '@elastic/elasticsearch';
import { ClusterHealthHealthResponseBody } from '@elastic/elasticsearch/lib/api/types';
import { config } from '@gateway/config';
import { winstonLogger } from '@vuphuc47edge/jobber-shared';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'GatewayServiceElasticSearch', 'debug');

class ElasticSearch {
  private elasticSearchClient: Client;

  constructor() {
    this.elasticSearchClient = new Client({
      node: `${config.ELASTIC_SEARCH_URL}`
    });
  }

  public async checkConnection(): Promise<void> {
    let isConnected = false;

    while (!isConnected) {
      try {
        const health: ClusterHealthHealthResponseBody = await this.elasticSearchClient.cluster.health({});

        log.info(`GatewayService ElasticSearch health status - ${health.status}`);

        isConnected = true;
      } catch (error) {
        log.error('GatewayService connecting to ElasticSearch failed. Retrying...');
        log.log('error', 'GatewayService checkConnection() method error:', error);
      }
    }
  }
}

export const elasticSearch: ElasticSearch = new ElasticSearch();
