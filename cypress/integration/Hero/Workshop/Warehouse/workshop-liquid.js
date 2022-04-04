/// <reference types="cypress" />

context("Warehouse", () => {
    it("liquid", () => {
        cy.login("007", "1234");
        liquid();
        liquid1();
        confimeliquid();

        // check();
    });
});
// รายละเอียดสินค้า
const liquid = () => {
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
};

const getRandomNumberliquid = (min, max) => {
    0, 0;
    return Math.random() * (max - min) + min;
};
// const taxliquid = (textNo) => {
//     cy.get('#lidquid-name').type("ของเหลว").type(textNo);
// };
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

// รายละเอียดราคา
const liquid1 = () => {
    cy.get(':nth-child(1) > #liquid-count').clear().type("500");
    cy.get('.mt-2 > #liquid-count').type("1")
    cy.get('#liquid-unit').type("อัน").type("{downarrow}{downarrow}{enter}")
    cy.get('#liquid-price').clear().type("1000");
    cy.get('#LIQUID > .col-xl-12 > .col-12 > :nth-child(3) > :nth-child(2) > #btnsaveInventoryPart').click()
};

// ยืนยันเพิ่มสินค้า
const confimeliquid = () => {
    cy.get(".swal2-confirm").click();
    cy.get("#tab-TIRE").click({ force: true });
};

const check = () => {
    cy.get('#selProductname').click({ force: true }).type("ของเหลว", { force: true }).type("{downarrow}{downarrow}{enter}", { force: true })
    cy.get('.btn-search').click({ force: true })

    cy.get('#inventorys-0 > :nth-child(1)').contains("ของเหลว")
};
