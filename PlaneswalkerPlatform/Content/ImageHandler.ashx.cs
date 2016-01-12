using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace PlaneswalkerPlatform.Content {
    /// <summary>
    /// Summary description for ImageHandler
    /// </summary>
    public class ImageHandler : HttpTaskAsyncHandler {

        public string MultiverseId {get; set;}

        [HttpGet]
        public override async Task ProcessRequestAsync(HttpContext context) {
                ProcessQueryString();
                byte[] image = await GetImage();

                context.Response.Clear();
                context.Response.ContentType = "image/jpeg";
                context.Response.BinaryWrite(image);
                context.Response.End();
        }

        public void ProcessQueryString() {
            MultiverseId = HttpContext.Current.Request.QueryString["multiverseid"];
        }

        public async Task<byte[]> GetImage() {
            return await CreateGetAndReturnResults("http://gatherer.wizards.com/Handlers", String.Format("Image.ashx?multiverseid={0}&type=card", MultiverseId));
        }

        public async Task<byte[]> CreateGetAndReturnResults(string baseUrl, string apiPath) {
            using (HttpClient client = new HttpClient()) {
                HttpResponseMessage response = await client.GetAsync(GetApiUri(baseUrl, apiPath));
                return await response.Content.ReadAsByteArrayAsync();
            }
        }

        private Uri GetApiUri(string baseUrl, string apiPath) {
            return new UriBuilder(String.Format("{0}/{1}", baseUrl, apiPath)).Uri;
        }

       
    }
}