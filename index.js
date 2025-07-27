import { spawn } from 'child_process';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// MCP 서버 생성
const server = new Server({
  name: 'mcp-weather-server',
  version: '1.0.0'
});

// 도구 등록
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'weather',
        description: 'Get weather information for a city',
        inputSchema: {
          type: 'object',
          properties: {
            city: {
              type: 'string',
              description: 'City name'
            }
          },
          required: ['city']
        }
      },
      {
        name: 'korea',
        description: 'Get weather information for a Korean city',
        inputSchema: {
          type: 'object',
          properties: {
            city: {
              type: 'string',
              description: 'Korean city name'
            }
          },
          required: ['city']
        }
      }
    ]
  };
});

server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;
  
  if (name === 'weather') {
    return {
      content: [
        {
          type: 'text',
          text: `The weather in ${args.city} is sunny and 25°C.`
        }
      ]
    };
  }
  
  if (name === 'korea') {
    return {
      content: [
        {
          type: 'text',
          text: `The weather in ${args.city} is sunny and 25°C.`
        }
      ]
    };
  }
  
  throw new Error(`Unknown tool: ${name}`);
});

// 서버 시작
const transport = new StdioServerTransport();
server.connect(transport);

console.log('MCP Weather Server started'); 