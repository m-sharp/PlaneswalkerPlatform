using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;

namespace PlaneswalkerPlatform.Content {
    /// <summary>
    /// Summary description for InfoHandler
    /// </summary>
    public class InfoHandler : HttpTaskAsyncHandler {

        [HttpGet]
        public override async Task ProcessRequestAsync(HttpContext context) {
            string infoText =  CleanUpJson(await GetInfo());

            context.Response.Clear();
            context.Response.ContentType = "text/javascript";
            context.Response.Write(infoText);
            context.Response.End();
        }

        public async Task<string> GetInfo() {
            return await CreateGetAndReturnResults("http://mtgjson.com/json", "AllSets.jsonp");
        }

        public async Task<string> CreateGetAndReturnResults(string baseUrl, string apiPath) {
            using (HttpClient client = new HttpClient()) {
                HttpResponseMessage response = await client.GetAsync(GetApiUri(baseUrl, apiPath));
                return await response.Content.ReadAsStringAsync();
            }
        }

        private Uri GetApiUri(string baseUrl, string apiPath) {
            return new UriBuilder(String.Format("{0}/{1}", baseUrl, apiPath)).Uri;
        }

        private string CleanUpJson(string jsonString) {
            jsonString = jsonString.Replace("mtgjsoncallback(", "");
            return jsonString.Replace(", \"AllSets\");", "");
        }
    }
}