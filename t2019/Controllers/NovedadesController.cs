using Backend.RRHH.Consultas;
using DataAccess.Models.RRHH;
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
				var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<ParamEntity<object>>(filtro) : null;
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

		[HttpGet("getListPatologias")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult getListPatologias([FromQuery]string filtro)
		{
			try
			{
				// Si el objeto que viene por parametro contiene algun valor, lo convierto con la funcion de JSON.
				// sino lo guardo como NULL
				var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<ParamEntity<object>>(filtro) : null;
				var result = novedadBackend.getListPatologias(paramObj);
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
		public IActionResult getListMarcaciones([FromQuery]string filtro)
		{
			try
			{
				// Si el objeto que viene por parametro contiene algun valor, lo convierto con la funcion de JSON.
				// sino lo guardo como NULL
				var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<ParamEntity<object>>(filtro) : null;
				var result = novedadBackend.getListMarcaciones(paramObj);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("getListJornadasHabituales")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult getListJornadasHabituales([FromQuery]string filtro)
		{
			try
			{
				// Si el objeto que viene por parametro contiene algun valor, lo convierto con la funcion de JSON.
				// sino lo guardo como NULL
				var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<ParamEntity<object>>(filtro) : null;
				var result = novedadBackend.getListJornadasHabituales(paramObj);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("getIncidenciasJustificaciones")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult getIncidenciasJustificaciones([FromQuery]string filtro)
		{
			try
			{
				// Si el objeto que viene por parametro contiene algun valor, lo convierto con la funcion de JSON.
				// sino lo guardo como NULL
				var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<ParamEntity<long>>(filtro) : null;
				var result = novedadBackend.getIncidenciasJustificaciones(paramObj);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("getNominaGrilla")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult getNominaGrilla([FromQuery]string filtro)
		{
			try
			{
				// Si el objeto que viene por parametro contiene algun valor, lo convierto con la funcion de JSON.
				// sino lo guardo como NULL
				var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<ParamEntity<object>>(filtro) : null;
				var result = novedadBackend.getNominaGrilla(paramObj);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("getJustificacionGrilla")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult getJustificacionGrilla([FromQuery]string filtro)
		{
			try
			{
				// Si el objeto que viene por parametro contiene algun valor, lo convierto con la funcion de JSON.
				// sino lo guardo como NULL
				var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<ParamEntity<Justificacion>>(filtro) : null;
				var result = novedadBackend.getJustificacionGrilla(paramObj);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("getIncidenciasGrillaModal")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult getIncidenciasGrillaModal([FromQuery]string filtro)
		{
			try
			{
				// Si el objeto que viene por parametro contiene algun valor, lo convierto con la funcion de JSON.
				// sino lo guardo como NULL
				var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<ParamEntity<object>>(filtro) : null;
				var result = novedadBackend.getIncidenciasGrillaModal(paramObj);
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
		public IActionResult guardarJornada([FromBody]ParamEntity<object> param)
		{
			try
			{
				var result = novedadBackend.guardarJornada(param);
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
		public IActionResult guardarIncidencia([FromBody]ParamEntity<Novedad> param)
		{
			try
			{
				var result = novedadBackend.guardarIncidencia(param);
				if(result.Ok)
				{
					var resultObservacion = novedadBackend.guardarObservacionIncidencia(param);
					if(resultObservacion.Ok && param.IdPatologia != -1)
					{
						var paramDynamic = new ParamEntity<dynamic>();
						paramDynamic.IdEmpresa = param.IdEmpresa;
						paramDynamic.IdLegajo = param.IdLegajo;
						paramDynamic.FechaDateArray = new DateTime[2];
						paramDynamic.FechaDateArray[0] = param.FechaDateArray[0];
						paramDynamic.FechaDateArray[1] = param.FechaDateArray[1];
						paramDynamic.IdPatologia = param.IdPatologia;
						paramDynamic.IdUsuario = param.IdUsuario;
						var resultPatologia = novedadBackend.guardarPatologiaIncidencia(paramDynamic);
						return Ok(resultPatologia);
					}
				}
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("anularMarcacion")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult anularMarcacion([FromBody]ParamEntity<Marcacion> param)
		{
			try
			{
				var result = novedadBackend.anularMarcacion(param);
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
		public IActionResult guardarMarcacion([FromBody]ParamEntity<Marcacion> param)
		{
			try
			{
				var result = novedadBackend.guardarMarcacion(param);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("guardarJornadaHabitual")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult guardarJornadaHabitual([FromBody]ParamEntity<JornadaHabitual> param)
		{
			try
			{
				var result = novedadBackend.guardarJornadaHabitual(param);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("updJustificacion")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult updJustificacion([FromBody]ParamEntity<Justificacion> param)
		{
			try
			{
				var result = novedadBackend.updJustificacion(param);
				if (result.Ok)
				{
					var paramDynamic = new ParamEntity<dynamic>();
					paramDynamic.IdEmpresa = param.IdEmpresa;
					paramDynamic.IdLegajo = param.IdLegajo;
					paramDynamic.FechaDateArray = new DateTime[2];
					paramDynamic.FechaDateArray[0] = param.FechaDateArray[0];
					paramDynamic.FechaDateArray[1] = param.FechaDateArray[1];
					paramDynamic.IdPatologia = param.IdPatologia;
					paramDynamic.IdUsuario = param.IdUsuario;
					var resultPatologia = novedadBackend.guardarPatologiaIncidencia(paramDynamic);
					return Ok(resultPatologia);
				}
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}