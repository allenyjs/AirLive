using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using AirLive.Models;
using System.Web.Caching;
using AirLive.Services;

namespace AirLive.Controllers
{
    public class ValuesController : ApiController
    {
        private static List<modelAQI> sourceAQIs;
        public ValuesController()
        {
            AQIService _AQIService = new AQIService();
            Task.Run(async () =>
            {
                sourceAQIs = await _AQIService.AQIs();
            });
            
        }
        private async Task<List<modelAQI>> AQIs()
        {
            List<modelAQI> _AQIs = new List<modelAQI>();
            Cache _cache = new Cache();
            string cachename = "AQI"+DateTime.UtcNow.Hour.ToString();
            bool getSuccess = false;
            if (_cache [cachename] != null)
            {
                try
                {
                    _AQIs = (List<modelAQI>)_cache.Get(cachename);
                    getSuccess = true;
                }
                catch (Exception)
                { }
            }
            if (_cache [cachename] == null || getSuccess == false)
            {
                string responseBody = string.Empty;
                using (HttpClient client = new HttpClient())
                {
                    string url = "http://opendata2.epa.gov.tw/AQI.json";

                    HttpResponseMessage response = await client.GetAsync(url);
                    if (response.IsSuccessStatusCode)
                    { }
                    responseBody = await response.Content.ReadAsStringAsync();

                }
                _AQIs = JsonConvert.DeserializeObject<List<modelAQI>>(responseBody);
                _cache.Remove(cachename);
                _cache.Add(cachename, _AQIs, null, DateTime.Now.AddMinutes(60), Cache.NoSlidingExpiration, CacheItemPriority.Default, null);
            }

            return _AQIs;
        }
        [HttpGet]
        [Route("api/AQIGet")]
        public async Task<IHttpActionResult> AQIGet(string County= "臺北市", string SiteName="中山")
        {
            try
            {
                List<modelAQI> _AQIs = new List<modelAQI>();
                //_AQIs = await AQIs();
                _AQIs = sourceAQIs;
                var filterResult = _AQIs.Where(m => m.County == County && m.SiteName == SiteName);
                if (filterResult.Any())
                {
                    return Ok(filterResult.First());
                }
            }
            catch (Exception ex)
            {}
            return BadRequest("查無相關資料");
        }
        [HttpGet]
        [Route("api/CountysGet")]
        public async Task<IHttpActionResult> CountysGet()
        {
            try
            {
                List<modelAQI> _AQIs = new List<modelAQI>();
                //_AQIs = await AQIs();
                _AQIs = sourceAQIs;
                var filterResult = _AQIs.Select(m => m.County).Distinct();
                if (filterResult.Any())
                {
                    return Ok(filterResult);
                }
            }
            catch (Exception ex)
            { }
            return BadRequest("查無相關資料");
        }
        [HttpGet]
        [Route("api/SidesGet")]
        public async Task<IHttpActionResult> SidesGet(string County= "臺北市")
        {
            try
            {
                List<modelAQI> _AQIs = new List<modelAQI>();
                _AQIs = sourceAQIs;
                var filterResult = _AQIs.Where(m => m.County == County).Select(m => m.SiteName);
                if (filterResult.Any())
                {
                    return Ok(filterResult);
                }
            }
            catch (Exception ex)
            {}
            return BadRequest("查無相關資料");
        }
        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string [] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
