using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Backend.RRHH.Consultas;
using DataAccess.Models.RRHH;
using Newtonsoft.Json;
using DataAccess.Models.Sistema.Helper;

namespace t2019.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NovedadesController : ControllerBase
    {
		private NovedadBackend novedadBackend = new NovedadBackend();

		[HttpGet("getnovedades")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<Novedad>))]
		[ProducesResponseType(403)]
		[ProducesResponseType(404)]
		public IActionResult getNovedades([FromQuery]string objeto)
        {
			var paramObj = JsonConvert.DeserializeObject<DateTimeEntity>(objeto);
			var fecha = new DateTime(paramObj.Anio, paramObj.Mes, paramObj.Dia);
            var result = novedadBackend.GetNovedades(fecha);
            return Ok(result);
        }

		[HttpGet("getListJornadas")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<CmbEntity>))]
		[ProducesResponseType(403)]
		[ProducesResponseType(404)]
		public IActionResult getListJornadas([FromQuery]string filtro = "")
		{
			// Si el objeto que viene por parametro contiene algun valor, lo convierto con la funcion de JSON.
			// sino lo guardo como NULL
			var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<long?>(filtro) : null;
			var result = novedadBackend.getListJornadas(paramObj);
			return Ok(result);
		}

		[HttpGet("getListIncidencias")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<CmbEntity>))]
		[ProducesResponseType(403)]
		[ProducesResponseType(404)]
		public IActionResult getListIncidencias([FromQuery]string filtro)
		{
			// Si el objeto que viene por parametro contiene algun valor, lo convierto con la funcion de JSON.
			// sino lo guardo como NULL
			var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<List<string>>(filtro) : null ;
			var result = novedadBackend.getListIncidencias(paramObj);
			return Ok(result);
		}

		[HttpGet("getListMarcaciones")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<Marcacion>))]
		[ProducesResponseType(403)]
		[ProducesResponseType(404)]
		public IActionResult getListMarcaciones([FromQuery]string filtro = "")
		{
			// Si el objeto que viene por parametro contiene algun valor, lo convierto con la funcion de JSON.
			// sino lo guardo como NULL
			var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<List<string>>(filtro) : null;
			/*var fechaArray = paramObj[0].Split("/");
			var fechaEntity = new DateTimeEntity(Int32.Parse(fechaArray[0]), Int32.Parse(fechaArray[1]), Int32.Parse(fechaArray[2]));
			var fecha = new DateTime(fechaEntity.Anio, fechaEntity.Mes, fechaEntity.Dia);
			paramObj[0] = fecha.ToString();*/
			var result = novedadBackend.getListMarcaciones(paramObj);
			return Ok(result);
		}
	}
}