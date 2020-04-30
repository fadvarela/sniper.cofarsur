using Backend.RRHH.Consultas;
using DataAccess.Models.Sistema.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Mime;

namespace t2019.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class NovedadesController : ControllerBase
	{
		private NovedadBackend novedadBackend = new NovedadBackend();

		[HttpGet("getnovedades")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult getNovedades([FromQuery]string filtro)
		{
			try
			{
				var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<List<string>>(filtro) : null;
				if (paramObj.Count > 0)
				{
					var fechaArray = paramObj[0].Split("/");
					var fechaEntity = new DateTimeEntity(Int32.Parse(fechaArray[0]), Int32.Parse(fechaArray[1]), Int32.Parse(fechaArray[2]));
					var fecha = new DateTime(fechaEntity.Anio, fechaEntity.Mes, fechaEntity.Dia);
					paramObj[0] = fecha.ToShortDateString();
				}
				var result = novedadBackend.GetNovedades(paramObj);

				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}

		}

		[HttpGet("getListJornadas")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult getListJornadas([FromQuery]string filtro = "")
		{
			try
			{
				// Si el objeto que viene por parametro contiene algun valor, lo convierto con la funcion de JSON.
				// sino lo guardo como NULL
				var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<long?>(filtro) : null;
				var result = novedadBackend.getListJornadas(paramObj);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("getListIncidencias")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult getListIncidencias([FromQuery]string filtro)
		{
			try
			{
				// Si el objeto que viene por parametro contiene algun valor, lo convierto con la funcion de JSON.
				// sino lo guardo como NULL
				var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<List<string>>(filtro) : null;
				var result = novedadBackend.getListIncidencias(paramObj);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("getListMarcaciones")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult getListMarcaciones([FromQuery]string filtro = "")
		{
			try
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
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		/*-------------------------POST-----------------------------*/

		[HttpPost("guardarJornada")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult guardarJornada([FromBody]string param)
		{
			try
			{
				var paramObj = (!string.IsNullOrEmpty(param)) ? JsonConvert.DeserializeObject<List<string>>(param) : null;
				var result = novedadBackend.guardarJornada(paramObj);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("guardarIncidencia")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult guardarIncidencia([FromBody]string param)
		{
			try
			{
				var paramObj = (!string.IsNullOrEmpty(param)) ? JsonConvert.DeserializeObject<List<string>>(param) : null;
				var result = novedadBackend.guardarIncidencia(paramObj);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("guardarMarcacion")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult guardarMarcacion([FromBody]string param)
		{
			try
			{
				var paramObj = (!string.IsNullOrEmpty(param)) ? JsonConvert.DeserializeObject<List<string>>(param) : null;
				var result = novedadBackend.guardarMarcacion(paramObj);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}