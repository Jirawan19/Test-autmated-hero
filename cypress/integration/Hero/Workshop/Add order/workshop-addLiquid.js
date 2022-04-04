/// <reference types="cypress" />

context("add_liquid", () => {
    it("add_liquid", () => {
        cy.pause()
        cy.login("test2.2329436448013107", "1234");

        // supplier()
        // add_liquid()
        Addorder()
        check_order()
    })
})
// เพิ่มสินค้า
const add_liquid = () => {
    cy.get("#nav-item-6").click({ force: true });
    cy.get("#tab-inventory").click({ force: true });
    cy.wait(2000);
    cy.get("#btn-addInventory").click({ force: true });
    cy.get('#tab-LIQUID').click({ force: true });

    // taxliquid(getRandomNumberliquid(0, 10));
    cy.get('#lidquid-name').click().type("น้ำมันเครื่อง").type("{downarrow}{downarrow}{enter}")
    taxliquid1(getRandomNumberliquid(0, 10));
    taxliquid2(getRandomNumberliquid(0, 10));

    cy.get('.row.mt-3 > :nth-child(2) > #btnNextPart').click({ force: true })

    cy.get(':nth-child(1) > #liquid-count').clear().type("500");
    cy.get('.mt-2 > #liquid-count').type("1")
    cy.get('#liquid-unit').type("อัน").type("{downarrow}{downarrow}{enter}")
    cy.get('#liquid-price').clear().type("1000");
    cy.get('#LIQUID > .col-xl-12 > .col-12 > :nth-child(3) > :nth-child(2) > #btnsaveInventoryPart').click()

    cy.get(".swal2-confirm").click();
    cy.get("#tab-TIRE").click({ force: true });
}
const getRandomNumberliquid = (min, max) => {
    0, 0;
    return Math.random() * (max - min) + min;
};

const taxliquid1 = (textNo) => {
    cy.get('#liquid-brand').type("ของเหลว").type(textNo);
};
const taxliquid2 = (textNo) => {
    cy.get('#liquid-manufacturerNo').type(textNo);
};
const taxliquid3 = (textNo) => {
    cy.get(':nth-child(4) > .mt-2 > #oeNo').type("ของเหลว").type(textNo);
};
const taxliquid4 = (textNo) => {
    cy.get('#liquid-fuel').type("ของเหลว").type(textNo);
};

// เพิ่มผู้จำหน่าย
const supplier = () => {
    cy.get("#nav-item-6").click();
    cy.get('#tab-supplier').click({ force: true });
    cy.get('#btn-addSupplier').click({ force: true })

    cy.get("#state-name").type("test01");
    cy.get("#state-address").type("sky");
    cy.get("#state-mobileNo").type("0955915150");
    cy.get("#state-taxCustomerNumber").type("1100201520688");
    cy.get('[success=""]').click();

    cy.get(".swal2-confirm").click();
};
// เพิ่มรายการซื้อ
const Addorder = () => {
    cy.get("#nav-item-4").click();
    // แท็บรายการซื้อ
    cy.get("#nav-item-4").click();

    // เลือกผู้จำหน่าย
    cy.get("#btnCreate_Other_Tire_PurchaseOrder").click({ force: true });
    cy.get("#selSupplierId > .el-input > .el-input__inner")
        .click({ force: true })
        .type("test")
        .wait(500)
        .type("{downarrow}{enter}");

    cy.get("#txtAddProductalt").click();
    cy.get('#tab-LIQUID').click({ force: true });

    cy.get('#pane-LIQUID > .d-xl-block > .table > tbody > :nth-child(1) > .text-left').contains("น้ำมันเครื่อง")
    cy.get('#addLiquidPo-13042').click()
    cy.get('.close').click()

    cy.get('#nbrQtyReceived_0').click({ force: true }).clear({ force: true }).type("5", { force: true })
    cy.get('#txtPrice_0').click({ force: true }).clear({ force: true }).type("100", { force: true })

    cy.get('tfoot > :nth-child(1) > .text-right').contains("500.00")
    cy.get(':nth-child(3) > .text-right').contains("35.00")
    cy.get(':nth-child(4) > .text-right').contains("535.00")
    cy.get('.row.text-right > :nth-child(2) > #btnCreatePurchaseOrder').click()
    cy.get('.swal2-confirm').click()
}
const check_order = () => {
    cy.wait(1000)
    cy.get('.md-pointer > :nth-child(4)').contains("test01")
    cy.get(':nth-child(5) > .status-border').contains("รายการเสร็จสิ้น")
}