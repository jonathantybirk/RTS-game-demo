class UI {
    static update() {
        UI.var11 = [];
        UI.var12 = [];
        UI.var13 = [];

        UI.var21 = [];
        UI.var22 = [];
        UI.var23 = Selector.position;

    }
    static draw() {
        document.getElementById("var11").innerHTML = UI.var11;
        document.getElementById("var12").innerHTML = UI.var12;
        document.getElementById("var13").innerHTML = UI.var13;
        document.getElementById("var21").innerHTML = UI.var21;
        document.getElementById("var22").innerHTML = UI.var22;
        document.getElementById("var23").innerHTML = UI.var23;
    }
}