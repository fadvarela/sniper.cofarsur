using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Models.Sistema.Helper
{
	public class DateTimeEntity
	{
		public int Dia { get; set; }
		public int Mes { get; set; }
		public int Anio { get; set; }
		public int Hora { get; set; }
		public int Minuto { get; set; }
		public int Segundo { get; set; }

		public DateTimeEntity() { }
		public DateTimeEntity(int Dia, int Mes, int Anio)
		{
			this.Dia = Dia;
			this.Mes = Mes;
			this.Anio = Anio;
		}

		public string getDateString()
		{
			return Dia + "/" + Mes + "/" + Anio;
		}
	}
}
