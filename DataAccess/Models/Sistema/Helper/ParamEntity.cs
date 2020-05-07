﻿using DataAccess.Models.RRHH;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Models.Sistema.Helper
{
	public class ParamEntity
	{
		public long IdUsuario { get; set; }
		public string FechaStr { get; set; }
		public DateTime FechaDate { get; set; }
		public long IdEmpresa { get; set; }
		public DateTimeEntity Fecha { get; set; }
		public long IdLegajo { get; set; }
		public long IdJornada { get; set; }
		public long IdIncidencia { get; set; }
		public long IdMarcacion { get; set; }
		public Marcacion MarcacionEntity { get; set; }

		public ParamEntity()
		{
			MarcacionEntity = new Marcacion();
		}

		
	}
}