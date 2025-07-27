from fastapi import FastAPI
from fastmcp import FastMCP


# FastAPI 앱 생성
app = FastAPI()

# MCP 서버 생성
mcp = FastMCP()

# 간단한 도구(tool) 등록: 입력받은 도시 이름에 대해 날씨 정보를 반환하는 예시
@mcp.tool()
def weather(city: str) -> str:
    # 실제 API 호출 대신 예시 응답 반환
    return f"The weather in {city} is sunny and 25°C."

@mcp.tool()
def korea(city: str) -> str:
    # 실제 API 호출 대신 예시 응답 반환
    return f"The weather in {city} is sunny and 25°C."

# MCP SSE 앱을 FastAPI에 마운트 (기본 경로: /mcp)
app.mount("/mcp", mcp.sse_app())

# 일반 FastAPI 라우트 예시
@app.get("/")
async def root():
    return {"message": "FastAPI MCP SSE Server is running"}

if __name__ == "__main__":
    import uvicorn
    # 8080 포트로 서버 실행
    uvicorn.run(app, host="0.0.0.0", port=8081)