using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using AirLive.Models;
using System.Web.Caching;

namespace AirLive.Services
{
    public class AQIService
    {
        public async Task<List<modelAQI>> AQIs()
        {
            List<modelAQI> _AQIs = new List<modelAQI>();
            Cache _cache = new Cache();
            string cachename = "AQI" + DateTime.UtcNow.Hour.ToString();
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
    }
}