using System.Net;


namespace WeatherApi.Tests.Helpers;

public sealed class FakeHandler : DelegatingHandler
{
    private readonly Func<HttpRequestMessage, HttpResponseMessage> _fn;
   public FakeHandler(Func<HttpRequestMessage, HttpResponseMessage> fn) => _fn = fn;

    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken ct)
        => Task.FromResult(_fn(request));

    public static HttpResponseMessage Json(string body, HttpStatusCode code = HttpStatusCode.OK) =>
        new(code) { Content = new StringContent(body, System.Text.Encoding.UTF8, "application/json") };
}

public sealed class FakeHttpClientFactory : IHttpClientFactory
{
    private readonly HttpClient _client;
    public FakeHttpClientFactory(HttpClient client) => _client = client;
    public HttpClient CreateClient(string name) => _client;
}
