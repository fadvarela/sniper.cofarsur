using Backend.RRHH.Consultas;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Mime;
using System.Threading.Tasks;

namespace t2019.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class FileController: ControllerBase
	{
		private NovedadBackend novedadBackend = new NovedadBackend();

		[HttpGet("descargaArchivo")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public async Task<IActionResult> DownFile([FromQuery]string filtro)
		{
			try
			{
				using (var httpClient = new HttpClient())
				{
					using (var response = await httpClient.GetAsync(filtro.Replace("\"", string.Empty)))
					{
						string result = null;
						result = response.Content.ReadAsStringAsync().Result.Replace("\"", string.Empty);
						byte[] mybytearray = Convert.FromBase64String(result);
						string mimeType = "application/octet-stream";
						string FileOutPutName = "asd";
						return new FileContentResult(mybytearray, mimeType)
						{
							FileDownloadName = FileOutPutName
						};

					}
				}
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
