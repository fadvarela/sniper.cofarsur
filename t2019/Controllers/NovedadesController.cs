using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


using Backend.RRHH.Consultas;
using DataAccess.Models.RRHH;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using DataAccess.Models.Sistema.Helper;

namespace t2019.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NovedadesController : ControllerBase
    {
		private NovedadBackend novedadBackend = new NovedadBackend();

		[HttpGet("getnovedades")]
        //[ProducesResponseType(200, Type = typeof(IEnumerable<Novedad>))]
        //[ProducesResponseType(403)]
        //[ProducesResponseType(404)]
        public IEnumerable<Novedad> getnovedades([FromQuery]string objeto)
        {
			var paramObj = JsonConvert.DeserializeObject<DateTimeEntity>(objeto);
			var fecha = new DateTime(paramObj.Anio, paramObj.Mes, paramObj.Dia);
            var result = novedadBackend.GetNovedades(fecha);
            return result;
        }

		[HttpGet("getListJornadas")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<CmbEntity>))]
		[ProducesResponseType(403)]
		[ProducesResponseType(404)]
		public IEnumerable<CmbEntity> getListJornadas([FromQuery]string filtro = "")
		{
			// Si el objeto que viene por parametro contiene algun valor, lo convierto con la funcion de JSON.
			// sino lo guardo con un 
			var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<long?>(filtro) : null;
			var result = novedadBackend.getListJornadas(paramObj);
			return result;
		}
	}
}