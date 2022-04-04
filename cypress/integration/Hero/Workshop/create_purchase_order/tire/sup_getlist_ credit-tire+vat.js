/// <reference types="cypress" />

context("supplier getLish tire+vat", () => {
    it("purchase_order_tire", () => {
        // cy.pause()
        cy.login("007", "1234");
        purchase_order()
        cy.logOut()
    })
    it("supplier_getLish ", () => {
        // cy.pause()
        cy.loginSupplier("atpf-member1", "atpf16011986")
        add_store()
        supplier_getLish()
        check_order()
        cy.logOut()
    })
    // it("check_finance", () => {
    //     // cy.pause()
    //     cy.login("empGrip01", "password");
    //     check_finance()
    // })
})
const purchase_order = () => {
    cy.get('#nav-item-0').click()
    cy.get('#btnMenu-0').click()
    cy.wait(1000)

    cy.get('#txtSelectWidth').click({ force: true }).type("255", { force: true })
        .type("{downarrow}{enter}", { force: true })
    cy.wait(500)
    cy.get('#txtSelectSeries').click({ force: true }).type("40", { force: true })
        .type("{downarrow}{enter}", { force: true })
    cy.wait(500)
    cy.get('#txtSelectRim').click({ force: true }).type("19", { force: true })
        .type("{downarrow}{enter}", { force: true })

    // เลือกอะไหล่
    cy.get('#btnAddCartById-26977').click({ force: true })

    // เข้าตะกร้าสินค้า
    cy.get('.input-group > #btnTopbar_Icon_Cart > img').click()
    cy.wait(500)

    cy.get('#lebTitleNameSupplier').contains("บริษัท ออโต้แพร์ จำกัด (อะไหล่ด่วน)")
    //เช็คสินค้า
    cy.get('.td-list-text > :nth-child(1)').contains("255 / 40 R 19")
    cy.get('.input-numbers > #btnIncrementBy-0-0')
        .click({ force: true }).click({ force: true })
    cy.get('thead > [style="cursor: pointer;"] > :nth-child(5)').contains("28,050.00")

    cy.get('#txtCommentByIndex-0').click().type("test")

    // +vat 7%
    cy.get('.two > .md-label-form > span').click()
    cy.get('div[style="cursor: pointer;"] > .three').contains("26,214.96")
    cy.get(':nth-child(4) > .three').contains("1,835.05")
    cy.get('.total-price').contains("28,050.01")

    cy.get(':nth-child(2) > .btn').click()
    cy.get('.swal2-confirm').click()

    cy.wait(1000)
    // เช็ครายการ
    cy.get(':nth-child(1) > :nth-child(1) > a > .primary-blue').click({ force: true })
    cy.get('.status-border').contains("รอยืนยันรายการ")

    cy.get('.table-order-wrapper.d-none > .table > tbody > :nth-child(1) > .text-left > .primary-blue')
        .contains("255 / 40 R 19")

    cy.get('#priceTotaltd').contains("26,214.96")
    cy.get(':nth-child(4) > #discountsdatatd').contains("1,835.05")
    cy.get('#totalNettd').contains("28,050.01")

    cy.get('#backtoindex').click()
}
const supplier_getLish = () => {
    cy.get('#nav-item-0').click()

    //ยืนยันรายการ
    cy.get(':nth-child(1) > :nth-child(1) > a > .primary-blue').click({ force: true })

    cy.wait(1000)
    // สถานะรอยืนยันรายการ
    cy.get('.status-border').contains("รอยืนยันรายการ")
    cy.wait(1000)

    // เลือกประเภทการชำระ
    // เครดิต
    cy.get('.col-3 > .el-select > .el-input > .el-input__inner').click({ force: true })
        .wait(1000).type("{downarrow}{enter}", { force: true })

    // แก้ไข
    cy.get('.my-3 > .btn').click({ force: true })

    cy.get('.d-xl-block > .table > tbody > tr > .text-left > .primary-blue').contains("255 / 40 R 19")
    cy.get(':nth-child(1) > [style="width: 10%;"] > .el-select > .el-input > .el-input__inner')
        .click({ force: true }).type("test", { force: true }).type("{downarrow}{enter}", { force: true })
    cy.get('.md-rows > .from-control').click({ force: true }).type("5000")

    cy.get(':nth-child(1) > .text-right').contains("26,214.96")
    cy.get('tfoot > :nth-child(3) > .text-right').contains("1,835.05")
    cy.get('tfoot > :nth-child(4) > .text-right').contains("28,050.01")

    cy.get('#saveConfirmedit').click()
    cy.get('.swal2-confirm').click()
    cy.wait(500)
    cy.get('.swal2-confirm').click()

    // สถานะรอรับสินค้า
    cy.get('.status-border').contains("รอรับสินค้า")

    cy.get('#nbrPurchaseOrderItemQtyReceivedDots_QtyReceived_0').click( { force: true }).clear().type("3", { force: true })
    cy.get('#txtPurchaseOrderItemQtyReceivedDots_Dot_0').click( { force: true }).clear().type("0722", { force: true })

    cy.get(':nth-child(1) > .text-right').contains("26,214.96")
    cy.get('tfoot > :nth-child(3) > .text-right').contains("1,835.05")
    cy.get('tfoot > :nth-child(4) > .text-right').contains("28,050.01")

    cy.get('#saveConfirm').click()
    cy.get('.swal2-confirm').click()
    cy.wait(500)
    cy.get('.swal2-confirm').click()
}
// เพิ่มร้านค้า
const add_store = () => {
    cy.get('#nav-item-2').click()
    cy.get('a > .el-button').click()
    taxStore1(getRandomStore(1, 3));
    taxStore2(getRandomStore(1, 3));
    cy.get('[success=""]').click()
    cy.get('.swal2-confirm').click()

}
const getRandomStore = (min, max) => {
    0, 0;
    return Math.random() * (max - min) + min;
};
const taxStore1 = (textNo) => {
    cy.get(':nth-child(1) > #state-name').click({ force: true }).type("test").type(textNo);
};
const taxStore2 = (textNo) => {
    cy.get(':nth-child(2) > #state-name').click({ force: true }).type("test").type(textNo);
};
const check_order = () => {
   // สถานะเสร็จสิ้น
   cy.get('.status-border').contains("รายการเสร็จสิ้น")
   cy.get('.d-xl-block > .table > tbody > tr > .text-left > .primary-blue').contains("255 / 40 R 19")
   cy.get('tbody > tr > :nth-child(8)').contains("ยืนยันการส่ง")

   cy.get(':nth-child(1) > .text-right').contains("26,214.96")
   cy.get('tfoot > :nth-child(3) > .text-right').contains("1,835.05")
   cy.get('tfoot > :nth-child(4) > .text-right').contains("28,050.01")

    cy.get('#backtoindex').click()
}
const check_finance = () => {
    cy.get('#nav-item-6').click()
    cy.get('#btnShowBy-1 > img').click()
    cy.wait(1000)

    cy.get('#txtSelectMonth').click().type("กุมภาพัน").type("{downarrow}{enter}", { force: true })
    cy.wait(1000)

    cy.get('.the-contents > .mt-5 > .table > tbody > :nth-child(1) > :nth-child(1)').should("contain.text", "POATP")
    cy.get('tbody > :nth-child(1) > :nth-child(4)').contains("28,050.01")
}