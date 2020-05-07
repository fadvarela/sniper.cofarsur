using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Models.Sistema.Helper
{
	public class Conversor
	{
		public static DateTime toDateTimeFromString(int dia, int mes, int anio)
		{
			return new DateTime(anio, mes, dia);
		}

		public static DateTime getDateTimeConcatenate(string fechaInput, string horaInput)
		{
			var hora = TimeSpan.Parse(horaInput);
			var fechaConvertir = DateTime.ParseExact(fechaInput, "dd/MM/yyyy", null);
			DateTime result = fechaConvertir + hora;
			return result;
		}
	}
}
